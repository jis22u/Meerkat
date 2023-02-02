package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.repository.MemberRepository;
import B107.server.meerkat.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private static final String METHOD_NAME = MemberController.class.getName();

    private final MemberService memberService;

    private final MemberRepository memberRepository;
    private final DecodeEncodeHandler decodeEncodeHandler;

//    @PostMapping("/signup")
//    public void sign(@RequestBody Model model) {
//        log.info("MemberController join method ...");
//
//        Member member = join(model);
//        System.out.println("asdfasf");
//        System.out.println(member);
//    }
//
//    public Member join(Model model) {
//        log.info("MemberService join() ...");
//        return memberRepository.save(model.toEntity(decodeEncodeHandler.passwordEncode(model.getPassword())));
//    }

    @PostMapping("/member/check")
    public ResponseDTO check(@RequestBody Model model) {
        return new ResponseDTO().of(HttpStatus.OK, "hi", model);
    }

    @GetMapping(value ="/")
    public String test() {
        return "test";
    }

}
