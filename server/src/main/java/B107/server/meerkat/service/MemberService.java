package B107.server.meerkat.service;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.dto.member.ProfileRes;
import B107.server.meerkat.dto.member.SignModReqDTO;
import B107.server.meerkat.dto.member.mod;
import B107.server.meerkat.dto.member.modPw;
import B107.server.meerkat.entity.Member;
import B107.server.meerkat.exception.ErrorCode;
import B107.server.meerkat.exception.MemberNotFoundException;
import B107.server.meerkat.exception.PasswordNotMatchException;
import B107.server.meerkat.repository.MemberRepository;
import B107.server.meerkat.repository.querydsl.MemberRepositoryImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@RequestMapping(value = "/member")
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepositoryImpl memberRepositoryImpl;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final DecodeEncodeHandler decodeEncodeHandler;
    private final MemberRepository memberRepository;

    // 회원 정보 수정
    @Transactional
    public long update(SignModReqDTO signModReqDTO, long idx) throws RuntimeException {

        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        String name = signModReqDTO.getName();
        String email = signModReqDTO.getEmail();
        String tel = signModReqDTO.getTel();

        member.update(signModReqDTO);
        memberRepository.updateMember(name, email, tel, idx);

        return member.getIdx();
    }

    // 회원 비밀번호 수정
    @Transactional
    public String updatePw(SignModReqDTO signModReqDTO, long idx) throws RuntimeException {

        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        if (passwordEncoder.matches(signModReqDTO.getOriginPassword(), member.getPassword())) {
            log.info("기존 패스워드가 일치 합니다 기존 패스워드 : {} ", member.getPassword());
        } else {
            throw new PasswordNotMatchException(ErrorCode.PW_NOT_MATCH);
        }

        String newPassword = decodeEncodeHandler.passwordEncode(signModReqDTO.getNewPassword());
        member.update(newPassword);

        return member.getMemberId();
    }

    @Transactional
    public ProfileRes readProfile(long idx) {

        List<Member> MyInfoList = memberRepositoryImpl.findMyProfile(idx);
        return MyInfoList.stream().map(member -> ProfileRes.builder().build().of(member)).collect(Collectors.toList()).get(0);
    }
}
