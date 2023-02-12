package B107.server.meerkat.dto.call;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CallDTO {
	private Long idx;
	private Double lat; // 위도
	private Double lng; // 경도
	private String location; // 위치 정보
	private Integer coin; // 주고받은 코인량
	private String content; // 요청사항 String
}
