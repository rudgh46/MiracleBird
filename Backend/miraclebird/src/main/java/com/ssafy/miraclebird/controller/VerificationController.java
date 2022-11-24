package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.RankDto;
import com.ssafy.miraclebird.dto.VerificationDto;
import com.ssafy.miraclebird.securityOauth.config.security.token.CurrentUser;
import com.ssafy.miraclebird.securityOauth.config.security.token.UserPrincipal;
import com.ssafy.miraclebird.service.VerificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/verification")
@Api("챌린지 미션 관련 REST V1")
public class VerificationController {
    private final VerificationService verificationService;

    @Autowired
    public VerificationController(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @ApiOperation(value = "모든 챌린지인증샷의 정보를 반환한다.", response = VerificationDto.class)
    @GetMapping("/")
    public ResponseEntity<List<VerificationDto>> getVerificationALL() {
        List<VerificationDto> result = verificationService.getVerificationALL();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지인증샷의 정보를 반환한다.", response = VerificationDto.class)
    @GetMapping("/{verification_idx}")
    public ResponseEntity<VerificationDto> getVerificationById(@PathVariable("verification_idx") Long verificationIdx) {
        VerificationDto result = verificationService.getVerificationById(verificationIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @ApiOperation(value = "특정 유저의 챌린지인증샷의 정보를 반환한다.", response = VerificationDto.class)
    @GetMapping("/user")
    public ResponseEntity<List<VerificationDto>> getVerificationByUser(@RequestParam Long userIdx) {
        List<VerificationDto> result = verificationService.getVerificationByUser(userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "챌린지인증샷을 등록한다.", response = VerificationDto.class)
    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody VerificationDto verificationDto, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        String result;
        try {
            long userIdx = userPrincipal.getId();
            verificationDto.setUserIdx(userIdx);
            result = verificationService.uploadVerification(verificationDto);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>(result,HttpStatus.OK);
    }

    @ApiOperation(value = "특정 챌린지 인증샷을 승인한다.", response = VerificationDto.class)
    @PutMapping("/approve/{verification_idx}")
    public ResponseEntity<VerificationDto> approveVerification(@PathVariable("verification_idx") Long verificationIdx, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) throws Exception {
        long userIdx = userPrincipal.getId();
        VerificationDto result = verificationService.approveVerification(verificationIdx, 1, userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지 인증샷을 거절한다.", response = VerificationDto.class)
    @PutMapping("/decline/{verification_idx}")
    public ResponseEntity<VerificationDto> declineVerification(@PathVariable("verification_idx") Long verificationIdx, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) throws Exception {
        long userIdx = userPrincipal.getId();
        VerificationDto result = verificationService.approveVerification(verificationIdx, 2, userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지 인증샷을 삭제한다.", response = VerificationDto.class)
    @DeleteMapping("/{verification_idx}")
    public ResponseEntity deleteVerificationInfo(@PathVariable("verification_idx") Long verificationIdx, @RequestParam(value = "user_idx",required = false) Long userIdx_no_use, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) throws Exception {
        try {
            long userIdx = userPrincipal.getId();
            verificationService.deleteVerificationInfo(verificationIdx, userIdx);
        } catch (Exception e){
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("verification delete success", HttpStatus.OK);
    }

    @ApiOperation(value = "챌린지 참가내역(마이페이지 잔디) 가져오기", response = VerificationDto.class)
    @GetMapping("/heatmap/{user_idx}")
    public ResponseEntity<List<VerificationDto>> getVerificationByPeriod(@PathVariable("user_idx") Long userIdx, @RequestParam("start_date") String startDate, @RequestParam("end_date") String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss.SSS");
        LocalDateTime startDate_parsed = LocalDateTime.parse(startDate, formatter);
        LocalDateTime endDate_parsed = LocalDateTime.parse(endDate, formatter);

        List<VerificationDto> result = verificationService.getVerificationByPeriod(userIdx, startDate_parsed, endDate_parsed);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "챌린지 성공 랭킹", response = VerificationDto.class)
    @GetMapping("/ranking/")
    public ResponseEntity<List<String>> getRankByCount() {
        List<String> result = verificationService.getRankByCount();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "챌린지 유지 랭킹", response = VerificationDto.class)
    @GetMapping("/ranking/streak")
    public ResponseEntity<List<String>> getRankByStreak() {
        List<String> result = verificationService.getRankByStreak();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "해당 유저가 챌린지를 며칠째 유지중인지 반환한다.", response = VerificationDto.class)
    @GetMapping("/streak/{user_idx}")
    public ResponseEntity getStreakByUserIdx(@PathVariable("user_idx") Long userIdx) {
        Long result = verificationService.getStreakByUserIdx(userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "챌린지 유지 랭킹", response = VerificationDto.class)
    @GetMapping("/ranking/nftowner")
    public ResponseEntity getNftOwner() {
        List<RankDto> result = verificationService.getNftOwner();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
