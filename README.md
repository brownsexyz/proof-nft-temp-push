# ProofNFT Monorepo

A full-stack NFT notarization platform with:

- FastAPI backend for file uploads + IPFS pinning
- Solidity smart contract for on-chain proof
- React + Wagmi frontend for uploading + minting

## Setup Guide

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Edit .env with Web3.Storage + DB info
uvicorn app.main:app --reload
```

### 2. Smart Contract

```bash
cd contracts
npm install
# Edit hardhat.config.js with Sepolia RPC + wallet key
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

## What Happens

1. Upload a file in the frontend
2. FastAPI hashes it + pins it to IPFS
3. You hit "Mint" — wallet signs + stores hash/CID on-chain
4. Boom — proof lives on IPFS + Ethereum

