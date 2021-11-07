import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState} from 'react';
import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from './idl.json';
import kp from './keypair.json'
// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

// Get our program's id form the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devent.
const network = clusterApiUrl('devnet');

// Control's how we want to acknowledge when a trasnaction is "done".
const opts = {
  preflightCommitment: "processed"
}


// Constants
const TWITTER_HANDLE = 'scottymrty';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);
  const checkIfWalletIsConnected = async () => {
    try {
      const {solana} = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found');
          const response = await solana.connect();
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString())
        } else {
          alert('get phantom wallet');
        }
      }
    } catch (error){
      console.error(error);
    }}
    const onInputChange = (event) => {
      const { value } = event.target;
      setInputValue(value);
    };

    const getProvider = () => {
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new Provider(
        connection, window.solana, opts.preflightCommitment,
      );
      return provider;
    }

    const createGifAccount = async () => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        console.log("ping")
        await program.rpc.startStuffOff({
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount]
        });
        console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
        await getGifList();
    
      } catch(error) {
        console.log("Error creating BaseAccount account:", error)
      }
    }

    const sendGif = async () => {
      if (inputValue.length === 0) {
        console.log("No gif link given!")
        return
      }
      console.log('Gif link:', inputValue);
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
    
        await program.rpc.addGif(inputValue, {
          accounts: {
            baseAccount: baseAccount.publicKey,
          },
        });
        console.log("GIF sucesfully sent to program", inputValue)
    
        await getGifList();
      } catch (error) {
        console.log("Error sending GIF:", error)
      }
    };
    useEffect(()=>{
      window.addEventListener('load', async (event) => {
        await checkIfWalletIsConnected();
      });
    }, []);

    const getGifList = async() => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
        
        console.log("Got the account", account)
        setGifList(account.gifList)
    
      } catch (error) {
        console.log("Error in getGifs: ", error)
        setGifList(null);
      }
    }
    
    useEffect(() => {
      if (walletAddress) {
        console.log('Fetching GIF list...');
        getGifList()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress]);

    const connectWallet = async () => {};
    const renderNotConnectedContainer = () => (
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button>
    );

    const renderConnectedContainer = () => {
      // If we hit this, it means the program account hasn't be initialized.
      if (gifList === null) {
        return (
          <div className="connected-container">
            <button className="cta-button submit-gif-button" onClick={createGifAccount}>
              Do One-Time Initialization For GIF Program Account
            </button>
          </div>
        )
      } 
      // Otherwise, we're good! Account exists. User can submit GIFs.
      else {
        return(
          <div className="connected-container">
            <input
              type="text"
              placeholder="Enter gif link!"
              value={inputValue}
              onChange={onInputChange}
            />
            <button className="cta-button submit-gif-button" onClick={sendGif}>
              Submit
            </button>
            <div className="gif-grid">
              {/* We use index as the key instead, also, the src is now item.gifLink */}
              {gifList.map((item, index) => (
                <div className="gif-item" key={index}>
                  <img alt="" src={item.gifLink} />
                </div>
              ))}
            </div>
          </div>
        )
      }
    };
    
  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 High Quality GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
