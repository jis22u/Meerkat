package B107.server.meerkat.service;

import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.dto.member.SignModReqDTO;
import B107.server.meerkat.entity.CallCheck;
import B107.server.meerkat.entity.Coin;
import B107.server.meerkat.entity.MarkerCheck;
import B107.server.meerkat.exception.ErrorCode;
import B107.server.meerkat.exception.MemberAlreadyExistException;
import B107.server.meerkat.repository.CallCheckRepository;
import B107.server.meerkat.repository.CoinRepository;
import B107.server.meerkat.repository.MarkerCheckRepository;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final DecodeEncodeHandler decodeEncodeHandler;
    private final MemberRepository memberRepository;
    private final MarkerCheckRepository markerCheckRepository;
    private final CallCheckRepository callCheckRepository;
    private final CoinRepository coinRepository;


    @Transactional
    public String sign(SignModReqDTO signModReqDTO) {

        String memberId = signModReqDTO.getMemberId();

        boolean exists = memberRepository.existsByMemberId(memberId);

        if (exists) {
            throw new MemberAlreadyExistException(ErrorCode.MEMBER_ALREADY_EXIST);
        }
        String password = decodeEncodeHandler.passwordEncode(signModReqDTO.getPassword());
        memberRepository.save(signModReqDTO.of(memberId, password));

        // markerCheck, callCheck, coin 초기화
        Long memberIdx =  memberRepository.findIdxByMemberId(memberId);
        MarkerCheck markerCheck = MarkerCheck.builder()
                .memberIdx(memberIdx)
                .mcCheck(false)
                .build();
        markerCheckRepository.save(markerCheck);

        CallCheck callCheck = CallCheck.builder()
                .memberIdx(memberIdx)
                .ccCheck(false)
                .build();
        callCheckRepository.save(callCheck);

        Coin coin = Coin.builder()
                .memberIdx(memberIdx)
                .build();
        coinRepository.save(coin);

        return memberId;
    }

}