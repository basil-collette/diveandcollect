<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\DivingEventCardController;
use App\Controller\DivingEventController;
use App\Repository\DivingEventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DivingEventRepository::class)]
#[ApiResource(operations: [
    new Get(),
    new Patch(),
    new Delete(),
    new Put(),
    new Post(),
    new Get(
        uriTemplate: '/diving_event/{id}/getCard',
        controller: DivingEventCardController::class,
        name: 'diving-event-card'
    ),
    new Post(
        uriTemplate: '/diving_event/{id}/uploadPicture',
        controller: DivingEventController::class,
        name: 'diving-event-upload'
    )
])]
class DivingEvent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $picture = null;

    #[ORM\OneToMany(mappedBy: 'divingEvent', targetEntity: Inventory::class)]
    private Collection $inventory;

    #[ORM\ManyToOne(inversedBy: 'divingEvent')]
    private ?Dive $dive = null;

    public function __construct()
    {
        $this->inventory = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * @return Collection<int, Inventory>
     */
    public function getInventory(): Collection
    {
        return $this->inventory;
    }

    public function addInventory(Inventory $inventory): self
    {
        if (!$this->inventory->contains($inventory)) {
            $this->inventory->add($inventory);
            $inventory->setDivingEvent($this);
        }

        return $this;
    }

    public function removeInventory(Inventory $inventory): self
    {
        if ($this->inventory->removeElement($inventory)) {
            // set the owning side to null (unless already changed)
            if ($inventory->getDivingEvent() === $this) {
                $inventory->setDivingEvent(null);
            }
        }

        return $this;
    }

    public function getDive(): ?Dive
    {
        return $this->dive;
    }

    public function setDive(?Dive $dive): self
    {
        $this->dive = $dive;

        return $this;
    }
}
