-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS RecipeSharingApp;
CREATE DATABASE RecipeSharingApp;
USE RecipeSharingApp;

-- Create the tables

CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

CREATE TABLE RecipeItems (
    recipe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    serving INT NOT NULL,
    cook_time VARCHAR(255),
    ingredients TEXT NOT NULL,
    instruction TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES RecipeItems(recipe_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- CREATE TABLE Likes (
--     like_id INT AUTO_INCREMENT PRIMARY KEY,
--     recipe_id INT NOT NULL,
--     user_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (recipe_id) REFERENCES RecipeItems(recipe_id),
--     FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );

CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    rating_value INT NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES RecipeItems(recipe_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- CREATE TABLE Tags (
--     tag_id INT AUTO_INCREMENT PRIMARY KEY,
--     tag_name VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE MediaItemTags (
--     media_id INT NOT NULL,
--     tag_id INT NOT NULL,
--     PRIMARY KEY (media_id, tag_id),
--     FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
--     FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
-- );


-- Insert the sample data

INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');

INSERT INTO Users (username, password, email, user_level_id) VALUES
('JohnDoe', 'to-be-hashed-pw1', 'johndoe@example.com', 2),
('JaneSmith', 'to-be-hashed-pw2', 'janesmith@example.com', 2),
('Anon5468', 'to-be-hashed-pw3', 'anon5468@example.com', 2),
('AdminUser', 'to-be-hashed-pw4', 'adminuser@example.com', 1);

INSERT INTO RecipeItems (user_id, filename, filesize, media_type, title, description, serving, cook_time, ingredients, instruction) VALUES
(2, 'sunset.jpg', 1024, 'image/jpeg', 'Tomaatti keitto', 'Maukas ja kevyt tomaattikeitto on todella helppo valmistaa. Keitto sopii hyvin myös alkuruoaksi', 4, '30 - 60 minuuttia', '
2 (150 g) sipulia
2 valkosipulinkynttä
1 rkl Pirkka ekstra-neitsytoliiviöljyä
2 tlk (à 400 g/240 g) K-Menu kuorittuja tomaatteja tomaattimehussa
n. 5 dl vettä
2 rkl Pirkka tomaattisosetta
1 tl suolaa
1 tl basilikaa
ripaus mustapippuria
1 rkl Pirkka tummaa balsamietikkakastiketta
1 dl tuoretta basilikaa hienonnettuna', '1 Kuori ja hienonna sipulit ja valkosipulinkynnet. 2
Kuullota sipuleita öljyssä kattilassa. 3
Lisää kattilaan tomaatit liemineen. Huuhtele tölkki vedellä ja lisää vesi kattilaan (noin 5 dl). 4
Mausta keitto suolalla, pippurilla ja basilikalla. Sekoita joukkoon tomaattipyree ja anna keiton hautua miedolla lämmöllä kannen alla noin 30 minuuttia. 5
Soseuta keitto sauvasekoittimella. Sekoita keittoon balsamietikkakastike ja tuore basilika. Voit ripotella osan basilikasta keiton pinnalle. Tarjoa keiton kanssa tuoretta leipää.');

INSERT INTO Comments (recipe_id, user_id, comment_text) VALUES
(1, 3, 'Maistuva!');


INSERT INTO Ratings (recipe_id, user_id, rating_value) VALUES
(1, 1, 5);

-- INSERT INTO Tags (tag_name) VALUES ('Nature'), ('Video'), ('Documentary'), ('Landscape');

-- INSERT INTO MediaItemTags (media_id, tag_id) VALUES
-- (1, 1),
-- (1, 4),
-- (2, 2),
-- (3, 1),
-- (2, 3);
