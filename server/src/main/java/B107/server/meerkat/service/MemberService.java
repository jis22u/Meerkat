package B107.server.meerkat.service;

import B107.server.meerkat.config.jwt.JwtTokenProvider;
import B107.server.meerkat.entity.Member;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public String findByMemberId(Map<String, String> user) {
        String mid = user.get("memberId");
        String pwd = user.get("password");

        Member member = memberRepository.findByMemberId(mid);
        if (!Objects.equals(mid, member.getMemberId()) && !Objects.equals(pwd, member.getPwd())) {
            throw new IllegalArgumentException("잘못된 로그인 정보입니다.");
        }
        return jwtTokenProvider.createToken(member.getNickname(), Collections.singletonList(member.getRole()));
    }

}
