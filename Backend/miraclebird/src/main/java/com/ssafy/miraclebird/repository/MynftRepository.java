package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MynftRepository extends JpaRepository<Mynft,Long>{
    List<Mynft> findAllByWallet(Wallet wallet);
    Mynft findByLandmark(Landmark landmark);
}
