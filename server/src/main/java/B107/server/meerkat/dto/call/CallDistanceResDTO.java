package B107.server.meerkat.dto.call;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CallDistanceResDTO {
    Long idx;
    String location;
    Double lat;
    Double lng;
    LocalDateTime expDate;

    @Builder
    @QueryProjection
    public CallDistanceResDTO(Long idx, String location, Double lat, Double lng, LocalDateTime expDate) {
        this.idx = idx;
        this.location = location;
        this.lat = lat;
        this.lng = lng;
        this.expDate = expDate;
    }
}
