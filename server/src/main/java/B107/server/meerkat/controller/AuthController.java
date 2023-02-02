package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.entity.Member;
import B107.server.meerkat.repository.MemberRepository;
import B107.server.meerkat.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    private final MemberRepository memberRepository;
    private final DecodeEncodeHandler decodeEncodeHandler;

    @PostMapping("sign")
    public void sign(@RequestBody Model model) {
        log.info("MemberController join method ...");

        Member member = join(model);
        System.out.println(member);
    }

    public Member join(Model model) {
        log.info("MemberService join() ...");
        return memberRepository.save(model.toEntity(decodeEncodeHandler.passwordEncode(model.getPassword())));
    }
}
