import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.bson.types.ObjectId;

import java.util.Date;
/**
 * Created by HP Pavilion i5-3230M on 22/04/2017.
 */
public class Account {

    private int id;
    private String email;
    private String password;

    private Date createdOn = new Date();

    public Account(BasicDBObject dbObject){
        this.id = dbObject.getInt("_id");
        this.email = dbObject.getString("email");
        this.password = dbObject.getString("password");
        this.createdOn = dbObject.getDate("createdOn");
    }

    public int getId(){
        return id;
    }

    public String getEmail(){
        return email;
    }

    public String getPassword(){
        return password;
    }
    public Date getCreatedOn(){
        return createdOn;
    }

}
