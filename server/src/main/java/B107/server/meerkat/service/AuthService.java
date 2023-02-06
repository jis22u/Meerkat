package B107.server.meerkat.service;

import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.dto.member.SignModReqDTO;
import B107.server.meerkat.entity.Member;
import B107.server.meerkat.exception.ErrorCode;
import B107.server.meerkat.exception.MemberAlreadyExistException;
import B107.server.meerkat.exception.MemberNotFoundException;
import B107.server.meerkat.exception.PasswordNotMatchException;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final DecodeEncodeHandler decodeEncodeHandler;
    private final MemberRepository memberRepository;

    @Transactional
    public String sign(SignModReqDTO signModReqDTO) {

        String memberId = signModReqDTO.getMemberId();

        boolean exists = memberRepository.existsByMemberId(memberId);

        if (exists) {
            throw new MemberAlreadyExistException(ErrorCode.MEMBER_ALREADY_EXIST);
        }
        String password = decodeEncodeHandler.passwordEncode(signModReqDTO.getPassword());
        memberRepository.save(signModReqDTO.of(memberId, password));

        return memberId;
    }

}