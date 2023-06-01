<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InventoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InventoryRepository::class)]
#[ApiResource]
class Inventory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $number = null;



    #[ORM\ManyToOne(inversedBy: 'inventory')]
    #[ORM\JoinColumn(nullable: false)]
    private ?DivingEvent $divingEvent = null;

    #[ORM\ManyToOne(inversedBy: 'inventories')]
    private ?Specie $specie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

        return $this;
    }


    public function getDivingEvent(): ?DivingEvent
    {
        return $this->divingEvent;
    }

    public function setDivingEvent(?DivingEvent $divingEvent): self
    {
        $this->divingEvent = $divingEvent;

        return $this;
    }

    public function getSpecie(): ?Specie
    {
        return $this->specie;
    }

    public function setSpecie(?Specie $specie): self
    {
        $this->specie = $specie;

        return $this;
    }
}
