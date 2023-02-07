package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMarkerCheck is a Querydsl query type for MarkerCheck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMarkerCheck extends EntityPathBase<MarkerCheck> {

    private static final long serialVersionUID = -244197397L;

    public static final QMarkerCheck markerCheck = new QMarkerCheck("markerCheck");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final BooleanPath mcCheck = createBoolean("mcCheck");

    public final StringPath memberId = createString("memberId");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QMarkerCheck(String variable) {
        super(MarkerCheck.class, forVariable(variable));
    }

    public QMarkerCheck(Path<? extends MarkerCheck> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMarkerCheck(PathMetadata metadata) {
        super(MarkerCheck.class, metadata);
    }

}

