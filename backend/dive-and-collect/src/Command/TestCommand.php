<?php

namespace App\Command;

use App\Entity\Specie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use App\Service\ApiMarineSpeciesService;


#[AsCommand(
    name: 'app:test',
    description: 'Test',
    hidden: false,
    aliases: ['app:test']
)]
class TestCommand extends Command
{

    private $apiMarineSpeciesService;

    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        ApiMarineSpeciesService $apiMarineSpeciesService
    ) {
        parent::__construct();

        $this->entityManager = $entityManager;
        $this->apiMarineSpeciesService = $apiMarineSpeciesService;
    }
    protected function configure(): void
    {
        $this
        // the short description shown while running "php bin/console list"
        // ->setDescription('Test command')
        // ->setName('app:test')
        ->addArgument('name', InputArgument::REQUIRED, "What do you want to test?")
        ->addArgument('args', InputArgument::IS_ARRAY, "Options")
        // the full command description shown when running the command with
        // the "--help" option
        ->setHelp('This command allows you to test');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            'TEST',
            '============',
            '',
        ]);

        
        $name = $input->getArgument('name');
        switch($name) {
            case 'extract_api_marine_species':
                $nb = $this->apiMarineSpeciesService->createFromData();
                $output->writeln($nb . " Species créées");
                break;
            case 'select_random_specie':
                $specie = $this->entityManager->getRepository(Specie::class)->findOneRandom();
                $output->writeln($specie ? ("Specie : ".$specie->getName()) : "NOT FOUND");
                break;
            default:
                $output->writeln("Commande '$name' n'existe pas");
                break;
        }

        return Command::SUCCESS;
    }
}