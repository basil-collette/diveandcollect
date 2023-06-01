<?php

namespace App\DataFixtures;

use App\Entity\Dive;
use App\Entity\DiveBook;
use App\Entity\User;
use App\Entity\Specie;
use App\Entity\Inventory;
use App\Entity\DivingEvent;
use App\Service\ApiMarineSpeciesService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;
    
    private ApiMarineSpeciesService $apiMarineSpeciesService;

    public function __construct(UserPasswordHasherInterface $hasher, ApiMarineSpeciesService $apiMarineSpeciesService)
    {
        $this->hasher = $hasher;

        $this->apiMarineSpeciesService = $apiMarineSpeciesService;
    }
    
    public function load(ObjectManager $manager): void
    {
        $this->apiMarineSpeciesService->createFromData();

        $faker = Factory::create('fr_FR');
        for ($i = 0; $i<50; $i++){
            $user = new User();

            $divebook = new DiveBook();

            $user->setEmail($faker->email());
            $user->setRoles([]);
            $user->setName($faker->name($gender = null));
            $user->setLanguage($faker->languageCode());
            $user->setAvatar('avatar-default.png');

            $password = $this->hasher->hashPassword($user, 'azerty');
            $user->setPassword($password);

            $divebook->setDivingLevel(mt_rand(1,4));

            $user->setDiveBook($divebook);

            $manager->persist($divebook);
            $manager->persist($user);

            $specieRepo = $manager->getRepository(Specie::class);

            for ($j=0; $j<5; $j++){

                $dive = new Dive();

                $dive ->setDiveBook($divebook);
                $dive->setDate($faker->dateTime($max = 'now', $timezone = null));
                $dive->setGeolocation(mt_rand(-90,90)." ".mt_rand(-180,180));
                $dive->setMaxDepth(mt_rand(1,100));
                $dive->setDuration(mt_rand(1,200));
                $dive->setCountry($faker->country());

                $manager->persist($dive);

                for ($k=0; $k < 5; $k++) { 

                    $divingEvent = new DivingEvent();

                    $divingEvent->setDive($dive);
                    $divingEvent->setPicture("hypocampe.jpg");

                    $manager->persist($divingEvent);

                    for ($l=0; $l < 1; $l++) { 
                        $inventory = new Inventory();

                        $inventory->setDivingEvent($divingEvent);
                        $inventory->setNumber(mt_rand(1,100));

                        $specie = $specieRepo->findOneRandom();
                        $inventory->setSpecie($specie);

                        $manager->persist($inventory);
                    }
                }
            }
        }

        $manager->flush();

    }



}
