<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\DivingEventCardController;
use App\Repository\DiveRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DiveRepository::class)]
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
])]
class Dive
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $geolocation = null;

    #[ORM\Column]
    private ?int $maxDepth = null;

    #[ORM\Column]
    private ?int $duration = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $country = null;

    #[ORM\OneToMany(mappedBy: 'dive', targetEntity: DivingEvent::class)]
    private Collection $divingEvent;

    #[ORM\ManyToOne(inversedBy: 'dive')]
    private ?DiveBook $diveBook = null;

    public function __construct()
    {
        $this->divingEvent = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getGeolocation(): ?string
    {
        return $this->geolocation;
    }

    public function setGeolocation(string $geolocation): self
    {
        $this->geolocation = $geolocation;

        return $this;
    }

    public function getMaxDepth(): ?int
    {
        return $this->maxDepth;
    }

    public function setMaxDepth(int $maxDepth): self
    {
        $this->maxDepth = $maxDepth;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }



    /**
     * @return Collection<int, DivingEvent>
     */
    public function getDivingEvent(): Collection
    {
        return $this->divingEvent;
    }

    public function addDivingEvent(DivingEvent $divingEvent): self
    {
        if (!$this->divingEvent->contains($divingEvent)) {
            $this->divingEvent->add($divingEvent);
            $divingEvent->setDive($this);
        }

        return $this;
    }

    public function removeDivingEvent(DivingEvent $divingEvent): self
    {
        if ($this->divingEvent->removeElement($divingEvent)) {
            // set the owning side to null (unless already changed)
            if ($divingEvent->getDive() === $this) {
                $divingEvent->setDive(null);
            }
        }

        return $this;
    }

    public function getDiveBook(): ?DiveBook
    {
        return $this->diveBook;
    }

    public function setDiveBook(?DiveBook $diveBook): self
    {
        $this->diveBook = $diveBook;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }
}
