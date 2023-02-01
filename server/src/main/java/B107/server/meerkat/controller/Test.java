package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.entity.Member;
import B107.server.meerkat.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/test")
public class Test {

	private final MemberRepository memberRepository;
	private final DecodeEncodeHandler decodeEncodeHandler;

	@PostMapping("/sign")
	public void sign(@RequestBody Model model) {
		log.info("MemberController join method ...");

		Member member = join(model);
		System.out.println("asdfasf");
		System.out.println(member);
	}

	public Member join(Model model) {
		log.info("MemberService join() ...");
		return memberRepository.save(model.toEntity(decodeEncodeHandler.passwordEncode(model.getPassword())));
	}

	@PostMapping("/member/check")
	public ResponseDTO check(@RequestBody Model model) {
		return new ResponseDTO().of(HttpStatus.OK, "hi", model);
	}
}

@Getter
@AllArgsConstructor
class Model {
	private String memberId, password, name, email, tel;

	public Member toEntity(String pw) {
		return Member.builder()
				.memberId(memberId)
				.password(pw)
				.name(name)
				.email(email)
				.tel(tel)
				.build();
	}
}
