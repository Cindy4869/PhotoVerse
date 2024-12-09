from pymongo import MongoClient
from datetime import datetime

uri = "mongodb+srv://ruoanw2:photoverse@cluster0.louf2.mongodb.net/"
client = MongoClient(uri)
db = client["photoverse"]

# db.Users.drop()
# db.Posts.drop()
# db.Comments.drop()
# db.Likes.drop()

users_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["user_id", "username", "email", "password"],
        "properties": {
            "user_id": {
                "bsonType": "int",
                "description": "INT, Primary key"
            },
            "username": {
                "bsonType": "string",
                "description": "VARCHAR(255), UNIQUE, NOT NULL"
            },
            "email": {
                "bsonType": "string",
                "description": "VARCHAR(255), UNIQUE, NOT NULL"
            },
            "password": {
                "bsonType": "string",
                "description": "VARCHAR(255), NOT NULL"
            }
        }
    }
}

posts_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["post_id", "author_id", "content", "creation_time"],
        "properties": {
            "post_id": {
                "bsonType": "int",
                "description": "INT, Primary key"
            },
            "author_id": {
                "bsonType": "int",
                "description": "INT, Foreign key Users(user_id), NOT NULL"
            },
            "content": {
                "bsonType": "string",
                "description": "TEXT, NOT NULL"
            },
            "img_reference": {
                "bsonType": "string",
                "description": "TEXT"
            },
            "creation_time": {
                "bsonType": "date",
                "description": "DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP"
            }
        }
    }
}

comments_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["comment_id", "post_id", "author_id", "content", "creation_time"],
        "properties": {
            "comment_id": {
                "bsonType": "int",
                "description": "INT, Primary key"
            },
            "post_id": {
                "bsonType": "int",
                "description": "INT, Foreign key Posts(post_id), NOT NULL"
            },
            "author_id": {
                "bsonType": "int",
                "description": "INT, Foreign key Users(user_id), NOT NULL"
            },
            "content": {
                "bsonType": "string",
                "description": "TEXT, NOT NULL"
            },
            "creation_time": {
                "bsonType": "date",
                "description": "DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP"
            }
        }
    }
}

likes_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["like_id", "post_id", "user_id", "creation_time"],
        "properties": {
            "like_id": {
                "bsonType": "int",
                "description": "INT, Primary key"
            },
            "post_id": {
                "bsonType": "int",
                "description": "INT, Foreign key Posts(post_id), NOT NULL"
            },
            "user_id": {
                "bsonType": "int",
                "description": "INT, Foreign key Users(user_id), NOT NULL"
            },
            "creation_time": {
                "bsonType": "date",
                "description": "DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP"
            }
        }
    }
}

try:
    db.create_collection("Users", validator=users_validator)
except Exception as e:
    print("Users collection creation error:", e)

try:
    db.create_collection("Posts", validator=posts_validator)
except Exception as e:
    print("Posts collection creation error:", e)

try:
    db.create_collection("Comments", validator=comments_validator)
except Exception as e:
    print("Comments collection creation error:", e)

try:
    db.create_collection("Likes", validator=likes_validator)
except Exception as e:
    print("Likes collection creation error:", e)

db.Users.create_index("user_id", unique=True)
db.Users.create_index("username", unique=True)
db.Users.create_index("email", unique=True)

db.Posts.create_index("post_id", unique=True)
db.Posts.create_index("author_id")

db.Comments.create_index("comment_id", unique=True)
db.Comments.create_index("post_id")
db.Comments.create_index("author_id")

db.Likes.create_index("like_id", unique=True)
db.Likes.create_index("post_id")
db.Likes.create_index("user_id")

db.Users.insert_one({
    "user_id": 0,
    "username": "example_user",
    "email": "example@example.com",
    "password": "password"
})
