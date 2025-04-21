/**
 * Matrix Digital Rain Animation
 * Creates a "Matrix-style" digital rain effect on the canvas element
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    // Initial canvas sizing
    resizeCanvas();

    // Resize canvas when window size changes
    window.addEventListener('resize', resizeCanvas);

    // Matrix effect character set (katakana characters + latin characters + numbers + hacking symbols)
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const hackSymbols = '/*!@#$%^&*()_+{}[]:;<>,.?/~`|\\';
    const binaryBits = '10';
    
    // Enhanced character set with more hacking symbols
    const characters = katakana + latin + nums + hackSymbols + binaryBits;

    // Matrix rain settings
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = [];
    const speeds = [];
    const glowIntensities = [];
    const charTypes = [];

    // Types of streams
    const STREAM_TYPES = {
        NORMAL: 0,    // Standard green stream
        BINARY: 1,    // Just 1s and 0s
        HIGHLIGHT: 2, // Brighter/white highlight stream
        FLASH: 3      // Stream that occasionally flashes 
    };

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Random starting position above canvas
        speeds[i] = Math.random() * 0.8 + 0.5; // Random speed between 0.5 and 1.3
        glowIntensities[i] = Math.random(); // Random glow intensity
        // Assign stream type with weighted probability
        const typeRand = Math.random();
        if (typeRand > 0.92) {
            charTypes[i] = STREAM_TYPES.HIGHLIGHT;
        } else if (typeRand > 0.83) {
            charTypes[i] = STREAM_TYPES.FLASH;
        } else if (typeRand > 0.7) {
            charTypes[i] = STREAM_TYPES.BINARY;
        } else {
            charTypes[i] = STREAM_TYPES.NORMAL;
        }
    }

    // Get a character based on the stream type
    function getCharacter(streamType) {
        if (streamType === STREAM_TYPES.BINARY) {
            return binaryBits.charAt(Math.floor(Math.random() * binaryBits.length));
        } else {
            return characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }

    // Render matrix digital rain
    function drawMatrix() {
        // Black background with opacity to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Calculate current position
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Skip if not visible yet
            if (y < 0) {
                drops[i] += speeds[i];
                continue;
            }

            // Select a random character based on stream type
            const char = getCharacter(charTypes[i]);
            
            // Determine color based on stream type and position
            const streamType = charTypes[i];
            const isFirstChar = Math.random() > 0.95;
            
            if (streamType === STREAM_TYPES.HIGHLIGHT) {
                // White/bright highlight streams
                ctx.fillStyle = 'rgba(220, 255, 220, 0.9)';
                ctx.shadowColor = '#0F0';
                ctx.shadowBlur = 15;
            } else if (streamType === STREAM_TYPES.FLASH && Math.random() > 0.92) {
                // Occasionally flashing streams
                ctx.fillStyle = '#FFF';
                ctx.shadowColor = '#FFF';
                ctx.shadowBlur = 20;
            } else if (isFirstChar) {
                // Leading character in each stream (brighter)
                ctx.fillStyle = '#FFF';
                ctx.shadowColor = '#0F0';
                ctx.shadowBlur = 10;
            } else {
                // Normal matrix green with varying intensity based on position in stream
                const distance = Math.abs(drops[i] - Math.floor(drops[i]));
                const greenIntensity = Math.floor(150 + 70 * (1 - distance));
                
                // Different shades for different stream types
                if (streamType === STREAM_TYPES.BINARY) {
                    ctx.fillStyle = `rgb(0, ${greenIntensity - 30}, 0)`;
                } else {
                    ctx.fillStyle = `rgb(0, ${greenIntensity}, 0)`;
                }
                
                // Add occasional glow based on the stream's glow intensity
                if (Math.random() > 0.98 - glowIntensities[i] * 0.3) {
                    ctx.shadowColor = '#0F0';
                    ctx.shadowBlur = 8 * glowIntensities[i];
                } else {
                    ctx.shadowBlur = 0;
                }
            }

            // Draw the character
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(char, x, y);
            
            // Reset shadow settings
            ctx.shadowBlur = 0;
            
            // After drawing, increment y position based on speed
            drops[i] += speeds[i];
            
            // Randomly reset some drops to top when they go offscreen
            if (y > canvas.height && Math.random() > 0.99) {
                drops[i] = -5;
                
                // Occasionally change stream type when resetting
                if (Math.random() > 0.7) {
                    const typeRand = Math.random();
                    if (typeRand > 0.92) {
                        charTypes[i] = STREAM_TYPES.HIGHLIGHT;
                    } else if (typeRand > 0.83) {
                        charTypes[i] = STREAM_TYPES.FLASH;
                    } else if (typeRand > 0.7) {
                        charTypes[i] = STREAM_TYPES.BINARY;
                    } else {
                        charTypes[i] = STREAM_TYPES.NORMAL;
                    }
                }
                
                // Randomize speed and glow for variety
                speeds[i] = Math.random() * 0.8 + 0.5;
                glowIntensities[i] = Math.random();
            }
        }
    }

    // Animation loop
    function animate() {
        drawMatrix();
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}); 