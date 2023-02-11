package B107.server.meerkat.config.utils;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBaseAtTime is a Querydsl query type for BaseAtTime
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QBaseAtTime extends EntityPathBase<BaseAtTime> {

    private static final long serialVersionUID = -1563955502L;

    public static final QBaseAtTime baseAtTime = new QBaseAtTime("baseAtTime");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> modifiedAt = createDateTime("modifiedAt", java.time.LocalDateTime.class);

    public QBaseAtTime(String variable) {
        super(BaseAtTime.class, forVariable(variable));
    }

    public QBaseAtTime(Path<? extends BaseAtTime> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBaseAtTime(PathMetadata metadata) {
        super(BaseAtTime.class, metadata);
    }

}

