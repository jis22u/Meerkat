package B107.server.meerkat.dto.marker;

import B107.server.meerkat.entity.Marker;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class MarkerDTO {
	private Double lat;
	private Double lng;
	private String location;

	private LocalDateTime regDate; 		// 등록 시간
	private LocalDateTime expDate; 		// 만료 시간


	@Builder
	public MarkerDTO(Double lat, Double lng, String location, LocalDateTime regDate, LocalDateTime expDate) {
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
