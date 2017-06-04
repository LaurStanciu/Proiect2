/**
 * Created by Laur Stanciu on 6/4/2017.
 */
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.bson.types.ObjectId;

public class Goods {

    private int id;
    private String company;
    private String type;
    private String description;
    //private String imagine;

    public Goods(BasicDBObject dbObject) {
        this.id = dbObject.getInt("_id");
        this.company = dbObject.getString("company");
        this.type = dbObject.getString("type");
        this.description = dbObject.getString("description");
        //this.imagine = dbObject.getString( key: "imagine");
    }


    public int getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    //public String getImagine() {
    // return imagine;
    //}
}
