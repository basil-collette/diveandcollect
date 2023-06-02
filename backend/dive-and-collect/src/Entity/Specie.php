<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SpecieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SpecieRepository::class)]
#[ApiResource]
class Specie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'specie', targetEntity: Inventory::class)]
    private Collection $inventories;

    #[ORM\Column(length: 255)]
    private ?string $specieKey = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $scientificName = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    public function __construct()
    {
        $this->inventories = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Inventory>
     */
    public function getInventories(): Collection
    {
        return $this->inventories;
    }

    public function addInventory(Inventory $inventory): self
    {
        if (!$this->inventories->contains($inventory)) {
            $this->inventories->add($inventory);
            $inventory->setSpecie($this);
        }

        return $this;
    }

    public function removeInventory(Inventory $inventory): self
    {
        if ($this->inventories->removeElement($inventory)) {
            // set the owning side to null (unless already changed)
            if ($inventory->getSpecie() === $this) {
                $inventory->setSpecie(null);
            }
        }

        return $this;
    }

    public function getSpecieKey(): ?string
    {
        return $this->specieKey;
    }

    public function setSpecieKey(string $specieKey): self
    {
        $this->specieKey = $specieKey;

        return $this;
    }

    public function getScientificName(): ?string
    {
        return $this->scientificName;
    }

    public function setScientificName(?string $scientificName): self
    {
        $this->scientificName = $scientificName;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

}
