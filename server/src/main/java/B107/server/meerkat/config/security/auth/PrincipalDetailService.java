package B107.server.meerkat.config.security.auth;

import B107.server.meerkat.entity.Member;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PrincipalDetailService implements UserDetailsService {
	private static final String METHOD_NAME = "PrincipalDetailService";
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info(METHOD_NAME + "- loadUserByUsername() ...");
		Member member = memberRepository.findByMemberId(username);

		MemberDTO memberDTO = MemberDTO.builder().build().of(member);

		if (member == null) {
			log.error("유저가 존재하지 않습니다. " + METHOD_NAME);
		}
		return new PrincipalDetails(memberDTO);
	}
}
