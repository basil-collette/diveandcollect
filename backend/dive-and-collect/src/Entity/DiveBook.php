<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DiveBookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DiveBookRepository::class)]
#[ApiResource]
class DiveBook
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $divingLevel = null;

    #[ORM\OneToMany(mappedBy: 'diveBook', targetEntity: Dive::class)]
    private Collection $dive;

    #[ORM\OneToOne(mappedBy: 'diveBook', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->dive = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDivingLevel(): ?int
    {
        return $this->divingLevel;
    }

    public function setDivingLevel(int $divingLevel): self
    {
        $this->divingLevel = $divingLevel;

        return $this;
    }

    /**
     * @return Collection<int, Dive>
     */
    public function getDive(): Collection
    {
        return $this->dive;
    }

    public function addDive(Dive $dive): self
    {
        if (!$this->dive->contains($dive)) {
            $this->dive->add($dive);
            $dive->setDiveBook($this);
        }

        return $this;
    }

    public function removeDive(Dive $dive): self
    {
        if ($this->dive->removeElement($dive)) {
            // set the owning side to null (unless already changed)
            if ($dive->getDiveBook() === $this) {
                $dive->setDiveBook(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setDiveBook(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getDiveBook() !== $this) {
            $user->setDiveBook($this);
        }

        $this->user = $user;

        return $this;
    }
}
