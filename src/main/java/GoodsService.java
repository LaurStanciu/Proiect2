/**
 * Created by Laur Stanciu on 6/4/2017.
 */
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.client.*;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

/**
 * Created by pgv on 04.06.2017.
 */
public class GoodsService {

    private final MongoDatabase db;
    private final MongoCollection<Document> collection;

    public GoodsService(MongoDatabase db){
        this.db = db;
        this.collection = db.getCollection("goods");

    }

    public List<DBObject> findAll(){
        List<DBObject> goods = new ArrayList<>();
        MongoCursor dbObjects = (MongoCursor) collection.find();
        while(dbObjects.hasNext()){
            DBObject dbObject = (BasicDBObject) dbObjects.next();
            goods.add(dbObject);
        }
        return goods;
    }

    public List<String> findGoods(String type, String description){

        List<String> goods = new ArrayList<>();
        MongoCursor<Document> cursor;

        if(description.equals("") && type.equals("")) cursor = (MongoCursor) collection.find().iterator();
        else if(description.equals("")) cursor = (MongoCursor) collection.find((eq("type", type))).iterator();
        else if(type.equals("")) cursor = (MongoCursor) collection.find(eq("description", description)).iterator();
        else cursor = collection.find((and(eq("type", type), eq("description", description)))).iterator();

        try {
            while (cursor.hasNext()) {
                goods.add(cursor.next().toJson());
            }
        } finally {
            cursor.close();
        }

        return goods;
    }



}
