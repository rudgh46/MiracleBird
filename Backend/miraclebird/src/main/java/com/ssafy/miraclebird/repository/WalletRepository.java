package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long>{

}
