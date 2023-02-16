package B107.server.meerkat.service;

import B107.server.meerkat.repository.CallCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CallCheckService {
	private final CallCheckRepository callCheckRepository;

}
