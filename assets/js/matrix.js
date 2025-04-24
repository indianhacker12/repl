/**
 * Matrix Digital Rain Animation
 * Creates a "Matrix-style" digital rain effect on the canvas element
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix');
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

    // Characters to use in the matrix rain
    const chars = 'αβγδεζηθικλμνξοπρστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    
    // Setup the columns
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Setup the drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // Random char generator
    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
    
    // Drawing the matrix
    function draw() {
        // Create a semi-transparent black overlay to fade previous frame
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text properties
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;
        
        // Draw each drop
        for (let i = 0; i < drops.length; i++) {
            // Draw a random character
            const text = getRandomChar();
            
            // Calculate x position
            const x = i * fontSize;
            
            // Calculate y position
            const y = drops[i] * fontSize;
            
            // Add a slight glow to some characters for effect
            if (Math.random() > 0.975) {
                ctx.fillStyle = '#fff'; // Bright white for occasional glow
                ctx.shadowColor = '#0f0';
                ctx.shadowBlur = 10;
                ctx.fillText(text, x, y);
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#0f0'; // Reset to default green
            } else {
                // Vary the green for a more dynamic effect
                const green = 150 + Math.floor(Math.random() * 105);
                ctx.fillStyle = `rgb(0, ${green}, 0)`;
                ctx.fillText(text, x, y);
            }
            
            // Reset drop when it reaches bottom or randomly to create varied effect
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move the drop down
            drops[i]++;
        }
    }
    
    // Run the animation
    setInterval(draw, 40);
}); 