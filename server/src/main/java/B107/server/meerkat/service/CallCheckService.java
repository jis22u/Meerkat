package B107.server.meerkat.service;

import B107.server.meerkat.entity.CallCheck;
import B107.server.meerkat.entity.MarkerCheck;
import B107.server.meerkat.repository.CallCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CallCheckService {
	private final CallCheckRepository callCheckRepository;

	/**
	 * 해당 사용자의 요청 가능 여부 조회 select
	 */
	@Transactional
	public boolean isCallCheck(Long memberIdx) {
		return callCheckRepository.findCcCheckById(memberIdx);
	}

	/**
	 * 해당 사용자의 요청 가능 여부 true or false 처리
	 */
	@Transactional
	public void registCallCheck(Long memberIdx, Boolean check) {
		CallCheck callCheck = CallCheck.builder()
				.memberIdx(memberIdx)
				.ccCheck(check)
				.build();
		callCheckRepository.save(callCheck);
		return;
	}

}
