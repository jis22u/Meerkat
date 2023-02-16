package B107.server.meerkat.dto.call;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CallDistanceReqDTO {
    Double lat;
    Double lng;

    @Builder
    @QueryProjection
    public CallDistanceReqDTO(Double lat, Double lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
