"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "@/styles/landing.module.scss";
import wwwSvg from "@/assets/svgs/www.svg";
import searchSvg from "@/assets/svgs/search.svg";
import checkSvg from "@/assets/svgs/check.svg";
import annoyedSvg from "@/assets/svgs/annoyed.svg";

const FindDomain = () => {
  const [domainName, setDomainName] = useState("");
  const [title, setTitle] = useState("Find a Domain");
  const [currSvg, setCurrSvg] = useState(wwwSvg);
  const [isSearching, setIsSearching] = useState(false);

  const checkDomain = async () => {
    setIsSearching(true);
    setTitle("Searching Database...");

    try {
      const response = await fetch(
        `https://app.veeu.io/api/check?domain=${domainName}.veeu.io`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.isAvailable) {
          setTitle("Domain Available");
          setCurrSvg(checkSvg);
        } else {
          setTitle("Domain not Available");
          setCurrSvg(annoyedSvg);
        }
      } else {
        throw new Error("Domain check failed");
      }
    } catch (err) {
      console.error("Error while checking domain :", err);
      setTitle("Error checking domain");
      setCurrSvg(annoyedSvg);
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (!isSearching) {
      setTitle("Find a Domain");
      setCurrSvg(wwwSvg);
    }
  }, [domainName]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && domainName.trim() && !isSearching) {
      checkDomain();
    }
  };

  return (
    <>
      <div className={styles.tryTop}>
        <Image src={currSvg} alt="www" width={16} />
        <p>{title}</p>
      </div>
      <div className={styles.domain}>
        <input
          type="text"
          placeholder="Claim your domain..."
          onChange={(e) => setDomainName(e.target.value)}
          onKeyDown={handleKeyPress}
          value={domainName}
        />
        <p>.veeu.io</p>
        <button
          onClick={checkDomain}
          disabled={isSearching || !domainName.trim()}
        >
          <Image src={searchSvg} alt="search" height={20} />
        </button>
      </div>
    </>
  );
};

export default FindDomain;
