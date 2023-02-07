package B107.server.meerkat.dto.marker;

import B107.server.meerkat.entity.Marker;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class MarkerDTO {
	private Long idx;
	private Long memberIdx;
	private Float lat;
	private Float lng;
	private String location;
	private LocalDateTime regDate; 		// 등록 시간
	private LocalDateTime expDate; 		// 종료 시간
	private LocalDateTime modifiedAt; 	// DB 수정 시간
	private LocalDateTime createdAt;	// DB 등록 시간


	@Builder
	public MarkerDTO (Marker marker) {
		this.memberIdx = marker.getMember().getIdx();
		this.lat = marker.getLat();
		this.lng = marker.getLng();
		this.location = marker.getLocation();
		this.regDate = marker.getRegDate();
		this.expDate = marker.getExpDate();
		this.modifiedAt = marker.getModifiedAt();
	}
}
