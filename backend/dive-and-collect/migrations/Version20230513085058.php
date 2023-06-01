<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230513085058 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE dive (id INT AUTO_INCREMENT NOT NULL, dive_book_id INT DEFAULT NULL, date DATETIME NOT NULL, geolocation VARCHAR(255) NOT NULL, max_depth INT NOT NULL, duration INT NOT NULL, city VARCHAR(255) NOT NULL, INDEX IDX_96BB044091738504 (dive_book_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dive_book (id INT AUTO_INCREMENT NOT NULL, diving_level INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE diving_event (id INT AUTO_INCREMENT NOT NULL, dive_id INT DEFAULT NULL, picture VARCHAR(255) NOT NULL, INDEX IDX_FBAB7CFF2E04E766 (dive_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE inventory (id INT AUTO_INCREMENT NOT NULL, diving_event_id INT NOT NULL, specie_id INT DEFAULT NULL, number INT NOT NULL, INDEX IDX_B12D4A361A57BDBC (diving_event_id), INDEX IDX_B12D4A36D5436AB7 (specie_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE specie (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, specie_key VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, dive_book_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, language VARCHAR(45) NOT NULL, avatar VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D64991738504 (dive_book_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE dive ADD CONSTRAINT FK_96BB044091738504 FOREIGN KEY (dive_book_id) REFERENCES dive_book (id)');
        $this->addSql('ALTER TABLE diving_event ADD CONSTRAINT FK_FBAB7CFF2E04E766 FOREIGN KEY (dive_id) REFERENCES dive (id)');
        $this->addSql('ALTER TABLE inventory ADD CONSTRAINT FK_B12D4A361A57BDBC FOREIGN KEY (diving_event_id) REFERENCES diving_event (id)');
        $this->addSql('ALTER TABLE inventory ADD CONSTRAINT FK_B12D4A36D5436AB7 FOREIGN KEY (specie_id) REFERENCES specie (id)');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D64991738504 FOREIGN KEY (dive_book_id) REFERENCES dive_book (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dive DROP FOREIGN KEY FK_96BB044091738504');
        $this->addSql('ALTER TABLE diving_event DROP FOREIGN KEY FK_FBAB7CFF2E04E766');
        $this->addSql('ALTER TABLE inventory DROP FOREIGN KEY FK_B12D4A361A57BDBC');
        $this->addSql('ALTER TABLE inventory DROP FOREIGN KEY FK_B12D4A36D5436AB7');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D64991738504');
        $this->addSql('DROP TABLE dive');
        $this->addSql('DROP TABLE dive_book');
        $this->addSql('DROP TABLE diving_event');
        $this->addSql('DROP TABLE inventory');
        $this->addSql('DROP TABLE specie');
        $this->addSql('DROP TABLE `user`');
    }
}
