/**
 * Created by Laur Stanciu on 6/3/2017.
 */
public class Models {
    public enum MessageType
    {
        Undefined(0),
        Successful(1),
        Warning(2),
        Failed(3);

        private final int value;

        MessageType(final int newValue) {
            value = newValue;
        }

        public int getValue() { return value; }
    }

    public class Message
    {
        public int type;
        public String text;

        public Message(MessageType type, String text){
            this.type = type.getValue();
            this.text = text;
        }
    }
}
