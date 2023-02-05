package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.dto.member.SignModReqDTO;
import B107.server.meerkat.dto.member.mod;
import B107.server.meerkat.dto.member.modPw;
import B107.server.meerkat.dto.member.signUp;
import B107.server.meerkat.entity.Member;
import B107.server.meerkat.repository.MemberRepository;
import B107.server.meerkat.service.AuthService;
import B107.server.meerkat.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign")
    public ResponseEntity<ResponseDTO> register(@RequestBody @Validated(signUp.class) SignModReqDTO signModReqDTO) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_REGISTER, authService.sign(signModReqDTO)));
    }

//    /**
//     * 회원 정보 수정
//     */
//    @PostMapping("/updateInfo")
//        public ResponseEntity<ResponseDTO> update(@RequestBody @Validated(mod.class) SignModReqDTO signModReqDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
//        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_MOD, authService.update(signModReqDTO, principalDetails.getMember().getIdx())));
//    }
//
//    /**
//     * 회원 비밀번호 수정
//     */
//    @PostMapping("/updatePw")
//    public ResponseEntity<ResponseDTO> updatePw(@RequestBody @Validated(modPw.class) SignModReqDTO signModReqDTO, @PathVariable("id") long id) {
//        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_MODPW, authService.updatePw(signModReqDTO, id)));
//    }
//
//    @GetMapping("/profile/read")
//    public ResponseEntity<ResponseDTO> readProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_EMP_PROFILE, authService.readProfile(principalDetails.getEmployee().getId())));
//    }

//    @PostMapping("/sign")
//    public void sign(@RequestBody Model model) {
//        log.info("AuthController join method ...");
//
//        Member member = join(model);
//        System.out.println(member);
//    }
//
//    public Member join(Model model) {
//        log.info("AuthService join() ...");
//        return memberRepository.save(model.toEntity(decodeEncodeHandler.passwordEncode(model.getPassword())));
//    }
}
