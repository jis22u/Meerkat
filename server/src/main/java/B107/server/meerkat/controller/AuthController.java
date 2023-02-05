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
}
