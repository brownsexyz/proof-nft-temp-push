import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState('');
  const [cid, setCid] = useState('');
  const [status, setStatus] = useState('Idle');

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://localhost:8000/upload', formData);
    setHash(res.data.sha256);
    setCid(res.data.cid);
    setStatus('Uploaded');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>ProofNFT UI</h1>
      {!isConnected ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected as {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
      <hr />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Hash</button>
      <p>Status: {status}</p>
      {cid && <p><strong>CID:</strong> {cid}</p>}
      {hash && <p><strong>SHA-256:</strong> {hash}</p>}
    </div>
  );
}
