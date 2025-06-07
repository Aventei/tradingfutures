// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize risk meter if on risk management page
    if (document.getElementById('risk-slider')) {
        initRiskMeter();
    }
    
    // Initialize emotion chart if on psychological discipline page
    if (document.getElementById('emotionChart')) {
        initEmotionChart();
    }
    
    // Initialize trading chart if on technical analysis page
    if (document.getElementById('tradingChart')) {
        initTradingChart();
    }
    
    // Initialize survival chart if on risk management page
    if (document.getElementById('survivalChart')) {
        initSurvivalChart();
    }
    
    // Create placeholder images if they don't exist
    createPlaceholderImages();
});

// Risk meter functionality
function initRiskMeter() {
    const slider = document.getElementById('risk-slider');
    if (slider) {
        // Set initial position
        updateRiskMeter(slider.value);
        
        // Add event listener for changes
        slider.addEventListener('input', function() {
            updateRiskMeter(this.value);
        });
    }
}

// Update risk meter position and value
function updateRiskMeter(value) {
    const indicator = document.getElementById('risk-indicator');
    const valueDisplay = document.getElementById('risk-value');
    
    if (indicator && valueDisplay) {
        // Calculate position (0-100%)
        const position = (value / 15) * 100;
        
        // Update indicator position
        indicator.style.left = `${position}%`;
        
        // Update value display
        valueDisplay.textContent = `${value}%`;
        
        // Change color based on risk level
        if (value <= 2) {
            valueDisplay.style.color = '#4caf50'; // Green - safe
        } else if (value <= 5) {
            valueDisplay.style.color = '#ff9800'; // Orange - caution
        } else {
            valueDisplay.style.color = '#f44336'; // Red - danger
        }
    }
}

// Emotion cycle chart
function initEmotionChart() {
    const ctx = document.getElementById('emotionChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Entry', 'Initial Profit', 'Peak', 'Decline', 'Bottom', 'Recovery'],
                datasets: [{
                    label: 'Market Price',
                    data: [50, 70, 90, 60, 30, 45],
                    borderColor: '#4a6fa5',
                    backgroundColor: 'rgba(74, 111, 165, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Emotional State',
                    data: [60, 80, 95, 40, 20, 55],
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                
                                if (label === 'Emotional State') {
                                    const emotions = [
                                        'Cautious Optimism', 
                                        'Excitement', 
                                        'Euphoria/Greed', 
                                        'Anxiety/Denial', 
                                        'Fear/Panic', 
                                        'Acceptance/Hope'
                                    ];
                                    const index = context.dataIndex;
                                    return `${label}: ${emotions[index]}`;
                                }
                                
                                return `${label}: ${value}`;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                if (value === 0) return 'Low';
                                if (value === 50) return 'Neutral';
                                if (value === 100) return 'High';
                                return '';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            }
        });
    }
}

// Trading chart with technical analysis
function initTradingChart() {
    const ctx = document.getElementById('tradingChart');
    if (ctx) {
        // Generate some realistic-looking price data
        const priceData = generatePriceData(100);
        
        // Calculate moving averages
        const sma20 = calculateSMA(priceData, 20);
        const sma50 = calculateSMA(priceData, 50);
        
        // Create chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: priceData.length }, (_, i) => i + 1),
                datasets: [{
                    label: 'Price',
                    data: priceData,
                    borderColor: '#333',
                    backgroundColor: 'rgba(51, 51, 51, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }, {
                    label: '20-day MA',
                    data: sma20,
                    borderColor: '#4a6fa5',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }, {
                    label: '50-day MA',
                    data: sma50,
                    borderColor: '#4cb5ae',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            }
        });
        
        // Add buy/sell annotations
        addTradingAnnotations(ctx, priceData);
    }
}

// Add buy/sell annotations to the trading chart
function addTradingAnnotations(ctx, priceData) {
    // Add buy point
    const buyPoint = document.createElement('div');
    buyPoint.className = 'chart-annotation buy';
    buyPoint.innerHTML = 'Buy';
    buyPoint.style.left = '35%';
    buyPoint.style.top = `${100 - (priceData[35] / Math.max(...priceData) * 100)}%`;
    ctx.parentNode.appendChild(buyPoint);
    
    // Add sell point
    const sellPoint = document.createElement('div');
    sellPoint.className = 'chart-annotation sell';
    sellPoint.innerHTML = 'Sell';
    sellPoint.style.left = '70%';
    sellPoint.style.top = `${100 - (priceData[70] / Math.max(...priceData) * 100)}%`;
    ctx.parentNode.appendChild(sellPoint);
}

// Survival simulation chart
function initSurvivalChart() {
    const ctx = document.getElementById('survivalChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0', '20', '40', '60', '80', '100'],
                datasets: [{
                    label: '1% Risk Per Trade',
                    data: [100, 98, 95, 93, 90, 88],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 3,
                    fill: true
                }, {
                    label: '5% Risk Per Trade',
                    data: [100, 85, 70, 55, 40, 25],
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderWidth: 3,
                    fill: true
                }, {
                    label: '10% Risk Per Trade',
                    data: [100, 65, 40, 20, 5, 0],
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderWidth: 3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Trades'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Account Survival Probability (%)'
                        },
                        min: 0,
                        max: 100
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            }
        });
    }
}

// Helper function to generate realistic price data
function generatePriceData(length) {
    let price = 100;
    const data = [price];
    
    for (let i = 1; i < length; i++) {
        // Random walk with some trend and volatility
        const change = (Math.random() - 0.48) * 3; // Slight upward bias
        price += change;
        
        // Add some patterns
        if (i > 30 && i < 40) {
            price += 0.5; // Uptrend
        } else if (i > 60 && i < 75) {
            price -= 0.3; // Downtrend
        }
        
        // Ensure price doesn't go negative
        price = Math.max(price, 10);
        
        data.push(price);
    }
    
    return data;
}

// Calculate Simple Moving Average
function calculateSMA(data, period) {
    const result = [];
    
    // Fill with nulls for the first (period-1) points
    for (let i = 0; i < period - 1; i++) {
        result.push(null);
    }
    
    // Calculate SMA for the rest
    for (let i = period - 1; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j];
        }
        result.push(sum / period);
    }
    
    return result;
}

// Create placeholder images for perception and reality
function createPlaceholderImages() {
    // Create placeholder images using canvas
    createCanvasImage('perception', 'Easy Money', '#ffebee', '#e74c3c');
    createCanvasImage('reality', 'Complex Reality', '#e8f5e9', '#2ecc71');
}

// Helper function to create canvas-based placeholder images
function createCanvasImage(name, text, bgColor, textColor) {
    // Check if images with this class exist
    const imgElements = document.querySelectorAll(`.${name}-img`);
    if (imgElements.length === 0) return;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle
    ctx.fillStyle = textColor;
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 150, 150);
    
    // Convert to data URL
    const dataURL = canvas.toDataURL('image/png');
    
    // Set as src for the image
    imgElements.forEach(img => {
        img.src = dataURL;
    });
}
