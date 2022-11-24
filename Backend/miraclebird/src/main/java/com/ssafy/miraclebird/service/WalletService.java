package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.WalletDto;
import com.ssafy.miraclebird.entity.Wallet;

import java.util.List;

public interface WalletService {
//    List<WalletDto> getWalletAll() throws Exception;
    WalletDto getWallet(Long userIdx) throws Exception;
    Wallet createWallet(WalletDto walletDto) throws Exception;
//    void updateWallet(WalletDto walletDto) throws Exception;
    void deleteWallet(Long walletIdx, Long userIdx) throws Exception;
}