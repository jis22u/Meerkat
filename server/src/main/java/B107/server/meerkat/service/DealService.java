package B107.server.meerkat.service;

import B107.server.meerkat.entity.Deal;
import B107.server.meerkat.repository.CallRepository;
import B107.server.meerkat.repository.DealRepository;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class DealService {

	private final DealRepository dealRepository;
	private final MemberRepository memberRepository;
	private final CallRepository callRepository;

	@Transactional
	public void registDeal(Long reqIdx, Long resIdx, Long callIdx){
		Deal deal = Deal.builder()
				.resMember(memberRepository.findById(resIdx).orElse(null))
				.reqMember(memberRepository.findById(reqIdx).orElse(null))
				.call(callRepository.findById(callIdx).orElse(null))
				.initTime(LocalDateTime.now())
				.build();
		dealRepository.save(deal);
	}

	@Transactional
	public Deal findDealByCallIdx(Long callIdx){
		return dealRepository.findDealByCallIdx(callIdx);
	}

}
