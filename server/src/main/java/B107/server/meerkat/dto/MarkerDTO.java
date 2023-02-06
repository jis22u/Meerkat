package B107.server.meerkat.dto;

import B107.server.meerkat.entity.Marker;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MarkerDTO {
	private Long idx;
	private Long memberId;
	private Float lat;
	private Float lng;
	private String location;
	private LocalDateTime regDate; 		// 등록 시간
	private LocalDateTime expDate; 		// 종료 시간

	public MarkerDTO(Marker marker) {
		this.idx = marker.getIdx();
		this.memberId = marker.getMember().getIdx();
		this.lat = marker.getLat();
		this.lng = marker.getLng();
		this.location = marker.getLocation();
		this.regDate = marker.getRegDate();
		this.expDate = marker.getExpDate();
	}

}
