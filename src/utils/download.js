import { getStreamData } from '../api/monochrome.js';

export async function downloadTrack(track, addDownload, updateProgress) {
  const id = `dl_${Date.now()}`;
  addDownload(id, track.title);
  
  try {
    const streamData = await getStreamData(track.id);
    if (!streamData?.url) throw new Error('No download URL found');

    const response = await fetch(streamData.url);
    if (!response.ok) throw new Error('Download failed');

    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const reader = response.body.getReader();
    const chunks = [];
    
    while(true) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.length;
      if (total) {
        updateProgress(id, Math.round((loaded / total) * 100));
      } else {
        updateProgress(id, Math.min(99, Math.round((loaded / 5000000) * 100)));
      }
    }

    const contentType = response.headers.get('content-type') || 'audio/mpeg';
    const extensionMap = {
      'audio/flac': 'flac',
      'audio/mpeg': 'mp3',
      'audio/mp4': 'm4a',
      'audio/x-m4a': 'm4a',
      'audio/ogg': 'ogg',
      'audio/wav': 'wav',
      'audio/webm': 'webm'
    };
    
    const ext = extensionMap[contentType] || (contentType.includes('flac') ? 'flac' : 'mp3');
    const blob = new Blob(chunks, { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const safeName = `${track.artist} - ${track.title}`.replace(/[<>:"/\\|?*]/g, '_');
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    updateProgress(id, 100);
  } catch (err) {
    console.error('Download error:', err);
    updateProgress(id, 0);
  }
}
