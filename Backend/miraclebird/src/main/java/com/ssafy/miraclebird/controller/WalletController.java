package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.WalletDto;
import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.securityOauth.config.security.token.CurrentUser;
import com.ssafy.miraclebird.securityOauth.config.security.token.UserPrincipal;
import com.ssafy.miraclebird.service.WalletService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wallet")
@Api("지갑 관련 REST V0.9")
public class WalletController {

    private final WalletService walletService;

    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @ApiOperation(value = "새로운 지갑을 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> createWallet(@RequestBody WalletDto walletDto) {
        try {
            Wallet wallet = walletService.createWallet(walletDto);
            return new ResponseEntity<String>(wallet.toString(),HttpStatus.OK);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

//        return new ResponseEntity<String>("여기로가면 안됨",HttpStatus.OK);
    }

    @ApiOperation(value = "user_id에 해당하는 지갑 정보를 반환한다.", response = WalletDto.class)
    @GetMapping("/{user_idx}")
    public ResponseEntity<WalletDto> getWallet(@PathVariable("user_idx") Long userIdx) {
        WalletDto result = null;
        try {
            result = walletService.getWallet(userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

//    @ApiOperation(value = "wallet_idx에 해당하는 게시글 정보를 수정한다.", response = String.class)
//    @PutMapping("/{wallet_idx}")
//    public ResponseEntity<String> updateWallet(@PathVariable("wallet_idx") Long walletIdx, @RequestBody WalletDto walletDto, @RequestParam("user_idx") Long userIdx) {
//        try {
//            walletDto.setWalletIdx(walletIdx);
//            walletService.updateWallet(walletDto, userIdx);
//        }
//        catch (Exception e) {
//            throw new RuntimeException();
//        }
//
//        return new ResponseEntity<String>("success",HttpStatus.OK);
//    }

    @ApiOperation(value = "wallet_idx에 해당하는 지갑 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/{wallet_idx}")
    public ResponseEntity<String> deleteWallet(@PathVariable("wallet_idx") Long walletIdx, @RequestParam(value = "user_idx", required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            walletService.deleteWallet(walletIdx, userIdx_nouse);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}