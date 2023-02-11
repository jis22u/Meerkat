package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMarker is a Querydsl query type for Marker
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMarker extends EntityPathBase<Marker> {

    private static final long serialVersionUID = 2094532381L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMarker marker = new QMarker("marker");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DateTimePath<java.time.LocalDateTime> expDate = createDateTime("expDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final BooleanPath isExp = createBoolean("isExp");

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final StringPath location = createString("location");

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final DateTimePath<java.time.LocalDateTime> regDate = createDateTime("regDate", java.time.LocalDateTime.class);

    public QMarker(String variable) {
        this(Marker.class, forVariable(variable), INITS);
    }

    public QMarker(Path<? extends Marker> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMarker(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMarker(PathMetadata metadata, PathInits inits) {
        this(Marker.class, metadata, inits);
    }

    public QMarker(Class<? extends Marker> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

