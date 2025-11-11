#!/usr/bin/env node

/**
 * Demo Audio Generator for Music Player
 * This script generates silent MP3 demo files for testing the player UI
 * 
 * Usage:
 *   node generate-demo-audio.js
 * 
 * Generates 8 demo MP3 files (davido1.mp3 - davido8.mp3)
 * Each file is ~25 seconds long
 */

const fs = require('fs');
const path = require('path');

// Minimal MP3 header with silent audio data
// This creates a valid but silent MP3 file that plays for ~25 seconds
function generateSilentMP3(filename, durationSeconds = 25) {
  // MP3 frame header for 128kbps, 44.1kHz, mono
  const frameHeader = Buffer.from([0xFF, 0xFB, 0x10, 0x00]);
  const frameData = Buffer.alloc(417); // ~417 bytes per frame at 128kbps

  // Calculate number of frames needed
  const framesPerSecond = 44100 / 1152; // 1152 samples per frame
  const numFrames = Math.ceil(framesPerSecond * durationSeconds);

  // ID3 header (ID3v2.3)
  const id3Header = Buffer.from([
    0x49, 0x44, 0x33, // "ID3"
    0x03, 0x00, 0x00, // Version 2.3.0, flags
    0x00, 0x00, 0x00, 0x00 // Size (0)
  ]);

  // Combine header + frames
  let mp3Buffer = id3Header;
  
  for (let i = 0; i < numFrames; i++) {
    mp3Buffer = Buffer.concat([mp3Buffer, frameHeader, frameData]);
  }

  // Write file
  fs.writeFileSync(filename, mp3Buffer);
  console.log(`✅ Created ${filename} (${durationSeconds}s)`);
}

// Generate all demo files
const trackNames = [
  'davido1.mp3',
  'davido2.mp3',
  'davido3.mp3',
  'davido4.mp3',
  'davido5.mp3',
  'davido6.mp3',
  'davido7.mp3',
  'davido8.mp3'
];

console.log('🎵 Generating demo audio files...\n');

trackNames.forEach((filename) => {
  const filepath = path.join(__dirname, filename);
  generateSilentMP3(filepath, 25);
});

console.log('\n✨ Demo audio files created successfully!');
console.log('The player is ready to use with test audio.\n');
