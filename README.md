# Crypto Wall 🚀

A beautiful, real-time cryptocurrency dashboard displaying Bitcoin and top cryptocurrencies with live data from Binance API.

## Features

- 📊 Real-time crypto prices and 24h changes
- 📱 Responsive design (Mobile, Tablet, Desktop)
- 🎨 Beautiful gradient cards with hover effects
- 📈 Live ticker with scrolling animation
- ⚡ Updates every 10 seconds
- 🌐 Production-ready Docker deployment

## Quick Start

### Using Docker (Recommended)

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Or build and run manually:**
   ```bash
   # Build the image
   docker build -t crypto-wall .
   
   # Run the container
   docker run -p 3000:80 crypto-wall
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Docker Commands

### Build Scripts
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Build Docker image
./scripts/docker-build.sh

# Run Docker container
./scripts/docker-run.sh
```

### Manual Docker Commands
```bash
# Build image
docker build -t crypto-wall:latest .

# Run container
docker run -d --name crypto-wall -p 3000:80 crypto-wall:latest

# View logs
docker logs crypto-wall

# Stop container
docker stop crypto-wall

# Remove container
docker rm crypto-wall
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

## Production Deployment

For production deployment with reverse proxy:

```bash
# Start with production profile
docker-compose --profile production up -d
```

This will start:
- Main application container
- Nginx reverse proxy with rate limiting
- Health checks and monitoring

## Architecture

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Icons:** Lucide React
- **API:** Binance Public API
- **Container:** Multi-stage Docker build with Nginx
- **Deployment:** Netlify (current) + Docker support

## API Data

The app fetches real-time data for:

**Main Grid:**
- Bitcoin (BTC), Ethereum (ETH), BNB, XRP
- Cardano (ADA), Solana (SOL), TRON (TRX)
- Polkadot (DOT), Litecoin (LTC)

**Ticker Scroll:**
- Dogecoin, Polygon, Avalanche, Chainlink
- Cosmos, Uniswap, Ethereum Classic, Stellar
- And 13 more popular cryptocurrencies

## Health Monitoring

The Docker container includes health checks:
- Endpoint: `/health`
- Interval: 30 seconds
- Timeout: 10 seconds

## Environment Variables

No environment variables required - the app uses public APIs.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for your own crypto dashboard!

---

**Live Demo:** https://inspiring-cajeta-9f9200.netlify.app

Built with ❤️ using React, TypeScript, and Docker