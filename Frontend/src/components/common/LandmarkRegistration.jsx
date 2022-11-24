import React from "react";
import { useState } from "react";
import COMMON_ABI from "../../common/ABI";
import axios from "axios";
import Web3 from "web3";
import getAddressFrom from "../../util/AddressExtractor";
import { NFTStorage } from "nft.storage";
import { Form, FormikProvider, useFormik } from "formik";
import styles from "./LandmarkRegistration.module.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

// NFTStorage token API
const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0MTM5RkNDZmFFMkU5NDg0Q0VlZWM5YjZGZTViQWE1MUZiQjNEMGYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDA5NjE1ODQ2NCwibmFtZSI6Ik1pcmFjbGUgQmlyZCJ9.rQfvLFypmPXA7AzEOGCjS3lOEwCW1boihucZZ53U_hQ",
});

function LandmarkRegistration() {
  const [item, setItem] = useState("");
  const [itemName, setItemName] = useState("");
  const [title, setTitle] = useState("");
  const [landmarkInfoIdx, setLandmarkInfoIdx] = useState("");
  const [landmarkIdx, setLandmarkIdx] = useState("");
  const [description, setDescription] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [uri, setUri] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [price, setPrice] = useState("");
  const [starforce, setStarforce] = useState("");
  const [privKey, setPrivKey] = useState("");

  // SSAFY Network
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  // 아이템 업로드 핸들링
  const handleItem = (event) => {
    setItem(event.target.files[0]);
  };

  // 개인키 입력 핸들링
  const handlePrivKey = (e) => {
    setPrivKey(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      landmarkInfoIdx: "",
      price: "",
      starforce: "",
    },
    onSubmit: (value) => {
      setTitle(value.itemName);
      setDescription(value.description);
      setLandmarkInfoIdx(value.landmarkInfoIdx);
      setPrice(value.price);
      setStarforce(value.starforce);
    },
  });
  const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

  // make URI Json
  async function createURI() {
    const metadata = await client.store({
      name: itemName,
      description: description,
      image: item,
    });
    console.log(metadata);
    setImgPath(`https://ipfs.io/ipfs${metadata.data.image.pathname}`);
    setUri(`https://${metadata.ipnft}.ipfs.nftstorage.link/metadata.json`);
  }

  // add NFT
  async function addItem() {
    const address = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );
    console.log("address", address);
    if (!address){
      alert("개인키가 일치하지 않습니다")
      return;
    }
    try {
      // make Contract
      const sender = web3.eth.accounts.privateKeyToAccount(privKey);
      web3.eth.accounts.wallet.add(sender);
      console.log(web3.eth.accounts.wallet);
      web3.eth.defaultAccount = sender.address;
      console.log("defaultAccount :", web3.eth.defaultAccount);

      const senderAddress = web3.eth.defaultAccount;
      const landmarkNft = new web3.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.NFT_ABI,
        import.meta.env.VITE_APP_NFT_CA
      );

      // NFT creation
      const response = await landmarkNft.methods
        .mintNFT(uri)
        .send({ from: senderAddress, gas: 3000000 });
      console.log(response);

      await landmarkNft
        .getPastEvents("Transfer", { fromBlock: "latest" })
        .then((result) => {
          console.log("ssafyNft getPastEvents", result);
          const evt = result.slice(-1);
          console.log(evt);

          const tokenId = evt[0].returnValues.tokenId;
          setTokenId(tokenId);

          // landmark minting
          axios(API_BASE_URL + "/landmark", {
            method: "POST",
            params: {
              user_idx: 1,
            },
            data: {
              hash: "string",
              imagePath: imgPath,
              jsonPath: uri,
              landmarkInfoIdx: landmarkInfoIdx,
              sellPrice: price,
              selling: true,
              starForce: starforce,
              tokenId: tokenId,
            },
            headers: {
              Authorization: "Bearer " + NOW_ACCESS_TOKEN,
            },
          })
            .then((result) => {
              console.log(result.data);
              console.log(result.data.landmarkIdx);
              const landmarkIdx = result.data.landmarkIdx;
              setTimeout(() => {
                setLandmarkIdx(landmarkIdx);
              }, 1000);
              console.log(landmarkIdx);
              alert(tokenId + "번째 NFT가 생성되었습니다 저장해주세요");
            })
            .catch((err) => console.log("Item update error", err));
        });
    } catch (err) {
      console.log("ERROR while adding item", err);
    }
  }

  async function addMyNFT() {
    // add admin nft
    axios(API_BASE_URL + "/mynft", {
      method: "POST",
      params: {
        user_idx: 1,
      },
      data: {
        landmarkIdx: landmarkIdx,
        walletIdx: 1,
      },
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((result) => {
        console.log(result);
        console.log(landmarkIdx);
        alert("저장되었습니다");
      })
      .catch((err) => console.log(landmarkIdx, "My NFT update error", err));
  }

  return (
    <div className={styles.contentCt}>
      <br />
      <input
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value);
        }}
        type="text"
        placeholder="name"
      ></input>
      <br />
      <input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        type="text"
        placeholder="description"
      ></input>
      <br />
      <input
        value={landmarkInfoIdx}
        onChange={(e) => {
          setLandmarkInfoIdx(e.target.value);
        }}
        type="text"
        placeholder="landmark_info_idx"
      ></input>
      <br />
      <input
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        type="text"
        placeholder="price"
      ></input>
      <input
        value={starforce}
        onChange={(e) => {
          setStarforce(e.target.value);
        }}
        type="text"
        placeholder="starforce"
      ></input>
      <br />
      <br />
      <input type="file" onChange={handleItem} />
      <br />
      <br />
      <button
        onClick={() => {
          createURI();
        }}
      >
        URI 생성
      </button>
      <div>URI: {uri}</div>
      {uri ? (
        <div>
          <FormikProvider value={formik}>
            <Form
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <div direction="row" sx={{ mt: 3 }}>
                <textarea
                  type="text"
                  label="개인키"
                  onChange={handlePrivKey}
                  value={privKey}
                  placeholder="개인키를 입력하세요"
                />
              </div>
              <button
                size="large"
                variant="contained"
                sx={{ ml: 3, width: "20%", fontSize: 16 }}
                onClick={addItem}
              >
                NFT 생성
              </button>
            </Form>
          </FormikProvider>
          <button
            size="large"
            variant="contained"
            sx={{ ml: 3, width: "20%", fontSize: 16 }}
            onClick={addMyNFT}
          >
            저장
          </button>
        </div>
      ) : (
        <div>uri가 생성되지 않았습니다</div>
      )}
    </div>
  );
}

export default LandmarkRegistration;
