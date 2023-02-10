package B107.server.meerkat.dto.marker;

import B107.server.meerkat.entity.Marker;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class MarkerDTO {
	private Float lat;
	private Float lng;
	private String location;
	private LocalDateTime regDate; 		// 등록 시간
	private LocalDateTime expDate; 		// 만료 시간


	@Builder
	public MarkerDTO(Float lat, Float lng, String location, LocalDateTime regDate, LocalDateTime expDate) {
		this.lat = lat;
		this.lng = lng;
		this.location = location;
		this.regDate = regDate;
		this.expDate = expDate;
	}

	public MarkerDTO of(Marker marker) {
		return MarkerDTO.builder()
				.lat(marker.getLat())
				.lng(marker.getLng())
				.location(marker.getLocation())
				.regDate(marker.getRegDate())
				.expDate(marker.getExpDate())
				.build();
	}
}
